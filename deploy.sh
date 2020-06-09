#!/usr/bin/env bash
bucket_name=pomtracker.haydenhw.com
distribution_id=E273JJKLU3MMFH

if [[ "$1" != --no-build ]]; then
    yarn build
fi

aws2 s3 sync build s3://$bucket_name
aws2 cloudfront create-invalidation \
    --distribution-id $distribution_id \
    --paths "/*"

