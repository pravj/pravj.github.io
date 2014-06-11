#!/usr/bin/bash

jekyll build && cp -r _site/* ../blog-static
