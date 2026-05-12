#!/bin/bash

# Create temporary directory for intermediate files
mkdir -p tmp/favicons

# Convert SVG to PNG with different sizes
magick public/favicons/favicon.svg -resize 16x16 tmp/favicons/favicon-16.png
magick public/favicons/favicon.svg -resize 32x32 tmp/favicons/favicon-32.png
magick public/favicons/favicon.svg -resize 48x48 tmp/favicons/favicon-48.png
magick public/favicons/favicon.svg -resize 64x64 tmp/favicons/favicon-64.png

# Combine all sizes into a single ICO file
magick tmp/favicons/favicon-16.png tmp/favicons/favicon-32.png tmp/favicons/favicon-48.png tmp/favicons/favicon-64.png public/favicons/favicon.ico

# Clean up temporary files
rm -rf tmp/favicons