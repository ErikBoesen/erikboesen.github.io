#!/bin/bash

# Ensure ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it using: sudo apt install imagemagick"
    exit 1
fi

# Loop through images 0.png to 49.png
for i in {0..49}; do
    input="${i}.png"
    output="resized_${i}.png"

    # Check if the file exists
    if [ -f "$input" ]; then
        # Resize to 1/4 size
        convert "$input" -resize 25% "$output"
        echo "Resized $input to $output"
    else
        echo "$input not found, skipping."
    fi
done

echo "Resizing complete."
