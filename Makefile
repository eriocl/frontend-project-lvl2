
install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8