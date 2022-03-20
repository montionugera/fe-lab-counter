#! /bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e
SUFFIX="-fe"
#remove suffix eg mont-fe to fe
# We must export it so it's available for envsubst
export COMMIT_SHA1=$CIRCLE_SHA1
export SERVICE_NAME=${CIRCLE_PROJECT_REPONAME%"$SUFFIX"}
# since the only way for envsubst to work on files is using input/output redirection,
#  it's not possible to do in-place substitution, so we need to save the output to another file
#  and overwrite the original with that one.
envsubst <./kube/deployment.yml >./kube/deployment.yml.out
mv ./kube/deployment.yml.out ./kube/deployment.yml

envsubst <./kube/service.yml >./kube/service.yml.out
mv ./kube/service.yml.out ./kube/service.yml

envsubst <./kube/ingress.yml >./kube/ingress.yml.out
mv ./kube/ingress.yml.out ./kube/ingress.yml

echo "$K8S_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt

./kubectl \
  --kubeconfig=/dev/null \
  --server=$K8_CLUSTER_END_POINT \
  --certificate-authority=cert.crt \
  --token=$K8S_TOKEN \
  apply -f ./kube/