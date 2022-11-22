#---VARIABLES---------------------------------#
#---REACT NATIVE---#

NPX = npx
REACT_NATIVE = $(NPX) react-native
REACT_NATIVE_START = $(REACT_NATIVE) start
REACT_NATIVE_START_RESET_CACHE = $(REACT_NATIVE_START) --reset-cache
RUN_ANDROID = $(REACT_NATIVE) run-android

## === 🆘  HELP ==================================================
help: ## Show this help.
	@echo "React-Native-Makefile"
	@echo "---------------------------"
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

rna: ## react-native android emulator
	$(RUN_ANDROID)
.PHONY: rna

rns: ## react-native start metro js bundler
	$(REACT_NATIVE_START)
.PHONY: rns

rnsc: ## react-native start reset cache
	$(REACT_NATIVE_START_RESET_CACHE)
.PHONY: rnsc

rnsca: rna rnsc ## react-native start reset cache and android emulator	
.PHONY: rnsca