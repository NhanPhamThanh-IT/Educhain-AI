import PropTypes from 'prop-types';
import {
    Box,
    Card,
} from '@mui/material';

import demo from '/Home/demo.mp4'
import TitleSection from '@components/ui/TitleSection';

const VideoDemo = ({
    autoPlay = true,
    controls = true
}) => {
    return (
        <>
            <TitleSection
                title="Video Demonstration"
                description="Watch the video below to get a better understanding of the product features and how it works in action."
            />
            <Card sx={{ maxWidth: 850, mx: 'auto', my: 4, boxShadow: 3 }}>
                <Box
                    component="video"
                    src={demo}
                    autoPlay={autoPlay}
                    controls={controls}
                    loading="lazy"
                    preload="metadata"
                    playsInline
                    sx={{
                        width: '100%',
                    }}
                />
            </Card>
        </>
    );
};

VideoDemo.propTypes = {
    autoPlay: PropTypes.bool,
    controls: PropTypes.bool
};

export default VideoDemo;
