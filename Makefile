.DEFAULT_GOAL := help

# -- [ APPS ] ----------------------------------------------------------
bin := $(shell npm bin)
babel := $(bin)/babel
stylus := $(bin)/stylus


# -- [ CONFIGURATION ] -------------------------------------------------
STYLUS_PATHS = -I node_modules/nib/lib
STYLUS_DIR := stylus
STYLUS_BLD := css
STYLUS_SRC := $(shell find $(STYLUS_DIR)/ -name '*.styl')
STYLUS_TGT := ${STYLUS_SRC:$(STYLUS_DIR)/%.styl=$(STYLUS_BLD)/%.css}


# -- [ COMPILATION ] ---------------------------------------------------
compile/stylus: $(STYLUS_SRC)
	mkdir -p $(STYLUS_BLD)
	$(stylus) $(STYLUS_PATHS) $$STYLUS_OPTIONS -o $(STYLUS_BLD) $(STYLUS_DIR)


node_modules: package.json
	npm install


# -- [ TASKS ] ---------------------------------------------------------
help:
	@echo ""
	@echo "Available tasks:"
	@echo ""
	@echo "  build-stylus .......... Compiles stylus files."
	@echo "  watch-stylus .......... Recompiles stylus automatically on every change."
	@echo "  clean ................. Removes build artifacts from the working directory."
	@echo ""


build-stylus: node_modules compile/stylus
watch-stylus:
	STYLUS_OPTIONS="--watch" $(MAKE) build-stylus


clean: $(STYLUS_TGT)
	rm -r $(STYLUS_TGT)


.PHONY: compile/stylus help build-stylus watch-stylus clean
