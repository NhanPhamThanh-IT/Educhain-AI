import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    Card,
    CardContent
} from '@mui/material';

import TitleSection from '@components/ui/TitleSection';

const VideoDemo = ({
    videoUrl,
    title,
    description,
    thumbnailUrl,
    autoPlay = true,
    controls = true
}) => {
    return (
        <>
            <TitleSection
                title="Video Demonstration"
                description="Watch the video below to get a better understanding of the product features and how it works in action."
            />
            <Card sx={{ maxWidth: 800, mx: 'auto', my: 4, boxShadow: 3 }}>
                {title && (
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {title}
                        </Typography>
                        {description && (
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        )}
                    </CardContent>
                )}

                <Box
                    component="video"
                    src={videoUrl}
                    poster={thumbnailUrl}
                    autoPlay={autoPlay}
                    controls={controls}
                    playsInline
                    sx={{
                        width: '100%',
                        maxHeight: 450,
                        borderRadius: 1,
                    }}
                />
            </Card>
        </>
    );
};

VideoDemo.propTypes = {
    videoUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    autoPlay: PropTypes.bool,
    controls: PropTypes.bool
};

export default VideoDemo;
