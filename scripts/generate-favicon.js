const fs = require('fs')
const path = require('path')

const outputDir = path.join(__dirname, '../public')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
}

// Create SVG favicon
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 0C28.656 0 0 28.656 0 64C0 99.344 28.656 128 64 128C99.344 128 128 99.344 128 64C128 28.656 99.344 0 64 0ZM97.248 68.464H73.024L90.144 85.584L83.728 92L66.608 74.88V99.104H57.52V74.88L40.4 92L33.984 85.584L55.648 63.92L33.984 42.256L40.4 35.84L57.52 52.96V28.736H66.608V59.376H97.248V68.464Z" fill="currentColor"/>
</svg>`

try {
    // Write SVG file
    fs.writeFileSync(path.join(outputDir, 'favicon.svg'), svgContent)
    console.log('✓ Generated favicon.svg')

    // Generate ICO and PNG files using sharp
    const sharp = require('sharp')

    // Generate favicon.ico (32x32)
    sharp(path.join(outputDir, 'favicon.svg'))
        .resize(32, 32)
        .toFile(path.join(outputDir, 'favicon.ico'))
        .then(() => console.log('✓ Generated favicon.ico'))
        .catch((err) => {
            console.error('✗ Error generating favicon.ico:', err.message)
            process.exit(1)
        })

    // Generate apple-touch-icon.png (180x180)
    sharp(path.join(outputDir, 'favicon.svg'))
        .resize(180, 180)
        .png()
        .toFile(path.join(outputDir, 'apple-touch-icon.png'))
        .then(() => console.log('✓ Generated apple-touch-icon.png'))
        .catch((err) => {
            console.error(
                '✗ Error generating apple-touch-icon.png:',
                err.message,
            )
            process.exit(1)
        })
} catch (err) {
    console.error('✗ Error generating favicon.svg:', err.message)
    process.exit(1)
}
