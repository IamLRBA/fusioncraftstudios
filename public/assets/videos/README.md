# Video Gallery Assets

This directory contains video files for the Architecture page Video Gallery section.

## Required Video Files

The following video files are expected by the VideoSection component:

1. `architectural-walkthrough.mp4` - Immersive 3D walkthrough of commercial project
2. `construction-progress.mp4` - Timelapse of construction phases
3. `interior-design-showcase.mp4` - Interior design concepts and materials
4. `sustainable-features.mp4` - Green building technologies
5. `site-analysis.mp4` - Site analysis and environmental considerations
6. `client-presentation.mp4` - Design concept presentations

## Video Specifications

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **Duration**: 2-5 minutes per video
- **File Size**: Optimize for web streaming (under 50MB per video recommended)

## Cover Images

Cover images for each video should be placed in:
`public/assets/images/videos/`

Required cover images:
- `architectural-walkthrough-cover.jpg`
- `construction-progress-cover.jpg`
- `interior-design-showcase-cover.jpg`
- `sustainable-features-cover.jpg`
- `site-analysis-cover.jpg`
- `client-presentation-cover.jpg`

## Fallback Behavior

If video files are not available, the component will show fallback placeholders with appropriate messaging.
