
BASEDIR=$(CURDIR)
OUTPUTDIR=$(BASEDIR)/build
GITHUB_PAGES_BRANCH=gh-pages

help:
	@echo 'Makefile for a cocos game                                                 '
	@echo '                                                                          '
	@echo 'Usage:                                                                    '
	@echo '   make run                            run game                           '
	@echo '   make clean                          remove the generated files         '
	@echo '   make publish                        compile web                        '
	@echo '   make github                         upload the web site via gh-pages   '
	@echo '                                                                          '

run:
	pypy -m SimpleHTTPServer 8080

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

publish: clean
	[ ! -d $(OUTPUTDIR) ] && mkdir $(OUTPUTDIR) -p;
	cp $(BASEDIR)/img $(OUTPUTDIR)/ -r;
	cp $(BASEDIR)/src $(OUTPUTDIR)/ -r;
	cp $(BASEDIR)/index.html $(OUTPUTDIR)/;

github: publish
	ghp-import  $(OUTPUTDIR) -m "make github" -b $(GITHUB_PAGES_BRANCH) -p
	git add .; git commit -m "update web site"; git push origin master

.PHONY: help run clean publish github