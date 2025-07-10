const { RemotionJsonGenerator, processAssetsFromFiles } = require('./asset-parser');
const fs = require('fs');

// Example 1: Basic usage with arrays
function example1() {
    console.log('Example 1: Basic usage');
    
    const generator = new RemotionJsonGenerator(1080, 1920, 30);
    
    // Debug subtitle positioning
    generator.debugSubtitlePositioning();
    
    const result = generator.generateRemotionJson({
        imageUrls: [
            'https://plus.unsplash.com/premium_photo-1686817098743-818c1699ba7e',
            'https://plus.unsplash.com/premium_photo-1686817098743-818c1699ba7e'
        ],
        imageFitModes: ['cover', 'contain'],
        transitionTypes: ['fade'],
        enableTransitions: true,
        audioUrls: [
            'https://cdn.designcombo.dev/audio/Dawn%20of%20change.mp3'
        ],
        srtContent: `1
00:00:00,000 --> 00:00:02,000
Hello World!

2
00:00:03,000 --> 00:00:05,000
Welcome to the video!`,
        imageDurations: [3000, 4000]
    });
    
    // Check subtitles were created
    const textItems = Object.values(result.trackItemsMap).filter(item => item.type === 'text');
    console.log(`\n=== Subtitle Debug ===`);
    console.log(`Generated ${textItems.length} subtitle items:`);
    textItems.forEach((item, index) => {
        console.log(`Subtitle ${index + 1}:`, {
            text: item.details.text,
            timing: `${item.display.from}ms - ${item.display.to}ms`,
            position: `top: ${item.details.top}, left: ${item.details.left}`
        });
    });
    
    generator.saveToFile(result, 'example1_output.json');
    return result;
}

// Run examples
if (require.main === module) {
    example1();
    console.log('All examples completed!');
}