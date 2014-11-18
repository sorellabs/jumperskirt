bin        = $(shell npm bin)
sjs        = $(bin)/sjs
browserify = $(bin)/browserify
jsdoc      = $(bin)/jsdoc
uglify     = $(bin)/uglifyjs
stylus     = $(bin)/stylus
VERSION    = $(shell node -e 'console.log(require("./package.json").version)')

# -- Configuration -----------------------------------------------------
PACKAGE  = jumperskirt
EXPORTS  = JumperSkirt

LIB_DIR  = lib
SRC_DIR  = src
SRC      = $(wildcard $(SRC_DIR)/*.sjs $(SRC_DIR)/**/*.sjs)
TGT      = ${SRC:$(SRC_DIR)/%.sjs=$(LIB_DIR)/%.js}

TEST_DIR = test/specs-src
TEST_BLD = test/specs
TEST_SRC = $(wildcard $(TEST_DIR)/*.sjs)
TEST_TGT = ${TEST_SRC:$(TEST_DIR)/%.sjs=$(TEST_BLD)/%.js}

STYLUS_PATHS = -I node_modules/nib/lib
STYLUS_DIR = stylus
STYLUS_BLD = css
STYLUS_SRC = $(wildcard $(STYLUS_DIR)/*.styl $(STYLUS_DIR)/**/*.styl)
STYLUS_DST = ${STYLUS_SRC:$(STYLUS_DIR)/%.styl:$(STYLUS_BLD)/%.css}

# -- Compilation -------------------------------------------------------
dist:
	mkdir -p $@

dist/$(PACKAGE).umd.js: $(LIB_DIR)/index.js $(TGT) dist
	$(browserify) $< $(BROWSERIFY_OPTIONS) --standalone $(EXPORTS) > $@

dist/$(PACKAGE).umd.min.js: dist/$(PACKAGE).umd.js
	$(uglify) --mangle - < $< > $@

$(LIB_DIR)/%.js: $(SRC_DIR)/%.sjs
	mkdir -p $(dir $@)
	$(sjs) --readable-names \
	       --load-readtable jsx-reader \
	       --module sweet-fantasies/src/do \
	       --module lambda-chop/macros \
	       --module es6-macros/macros/destructure \
	       --module macros.operators/macros \
	       --module adt-simple/macros \
	       --module sparkler/macros \
	       --output $@ \
	       $<

$(TEST_BLD)/%.js: $(TEST_DIR)/%.sjs
	mkdir -p $(dir $@)
	$(sjs) --readable-names \
	       --module hifive/macros \
	       --module alright/macros \
	       --output $@ \
	       $<


# -- Tasks -------------------------------------------------------------
all: $(TGT)

bundle: dist/$(PACKAGE).umd.js

dev-bundle:
	BROWSERIFY_OPTIONS="--debug" $(MAKE) bundle

minify: dist/$(PACKAGE).umd.min.js

css:
	mkdir -p $(STYLUS_BLD)
	$(stylus) $(STYLUS_PATHS) $(STYLUS_OPTIONS) -o $(STYLUS_BLD) $(STYLUS_DIR)

watch-css:
	STYLUS_OPTIONS="--watch" $(MAKE) css

documentation:
	$(jsdoc) --configure jsdoc.conf.json
	ABSPATH=$(shell cd "$(dirname "$0")"; pwd) $(MAKE) clean-docs

clean-docs:
	perl -pi -e "s?$$ABSPATH/??g" ./docs/*.html

clean:
	rm -rf dist build $(LIB_DIR) $(TEST_BLD) $(STYLUS_BLD)

test: all $(TEST_TGT)
	node test/tap

package: documentation bundle minify
	mkdir -p dist/$(PACKAGE)-$(VERSION)
	cp -r docs dist/$(PACKAGE)-$(VERSION)
	cp -r lib dist/$(PACKAGE)-$(VERSION)
	cp dist/*.js dist/$(PACKAGE)-$(VERSION)
	cp package.json dist/$(PACKAGE)-$(VERSION)
	cp README.md dist/$(PACKAGE)-$(VERSION)
	cp LICENCE dist/$(PACKAGE)-$(VERSION)
	cd dist && tar -czf $(PACKAGE)-$(VERSION).tar.gz $(PACKAGE)-$(VERSION)

publish: clean test
	npm install
	npm publish

bump:
	node tools/bump-version.js $$VERSION_BUMP

bump-feature:
	VERSION_BUMP=FEATURE $(MAKE) bump

bump-major:
	VERSION_BUMP=MAJOR $(MAKE) bump

.PHONY: test bump bump-feature bump-major publish package clean documentation dev-bundle css watch-css
