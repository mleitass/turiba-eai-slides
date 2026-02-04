const fs = require('fs');
const path = require('path');

try {
    const content = fs.readFileSync('../Session 3 - EIP Routing (slides).md', 'utf8');
    // Split by "## Slide" 
    // Note: The file starts with ## Slide 1, so the first split might be empty if we split by delimiter.
    const sections = content.split(/^## Slide /gm);

    const slides = sections.slice(1).map(section => {
        const lines = section.split('\n');
        const headerLine = lines[0].trim(); // e.g., "1 — Title Slide"

        // Extract title
        // Supported formats: "1 — Title", "8a — Title", "33b — Title"
        // Separator seems to be "—" (em dash) based on file view
        let title = headerLine;
        const separatorRegex = /^\s*[0-9]+[a-z]*\s*[—\-–]\s*(.*)$/i;
        const match = headerLine.match(separatorRegex);
        if (match) {
            title = match[1].trim();
        } else {
            // Fallback if regex fails, just take text after first space
            title = headerLine.replace(/^[0-9a-z]+\s+/, '');
        }

        // Extract Custom Image (Visual: /path/to/image)
        let visualImage = null;
        let filteredLines = [];

        for (const rawLine of lines.slice(1)) {
            const line = rawLine.trim();
            const visualMatch = line.match(/^Visual:\s*(.+)$/i);
            if (visualMatch) {
                visualImage = visualMatch[1].trim();
            } else {
                // Keep original formatting for body, but maybe we want to process it?
                // Actually the original code pushed 'line' (rawLine variable here)
                // Let's push rawLine to preserve markdown formatting (indentation etc)
                // unless it was the Visual tag.
                filteredLines.push(rawLine);
            }
        }

        // Body is the rest
        const body = filteredLines.join('\n').trim();

        return {
            title: title,
            body: body,
            visualImage: visualImage,
            noImage: body.includes('(Diagram Slide)') || body.includes('Table'), // Heuristic from content
        };
    });

    const code = `export const slidesContent = ${JSON.stringify(slides, null, 2)};`;
    fs.writeFileSync('./src/slides.ts', code);
    console.log(`Successfully generated ${slides.length} slides.`);

} catch (e) {
    console.error(e);
    process.exit(1);
}
