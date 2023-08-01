#!/usr/bin/env sh

# cd src && find . -type f -not -name "*.ts" -not -name "*.tsx" -not -name "*.snap" -exec cp -p --parents '{}' ../dist \; && cd ..

# cp package.json dist/ && ditto types dist/types


# for macOs local development
rsync -av --exclude='*.ts' --exclude='*.tsx' --exclude='*.snap' src/ dist/

cp package.json dist/

cp -R types/ dist/types/