import { Typography } from "@mui/material";
import { memo } from 'react';

const SectionHeading = memo(({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <>
            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                {Icon && <Icon sx={{ fontSize: 40, mr: 1 }} />}
                {title}
            </Typography>
            <Typography variant="body1" mb={4} textAlign="center" color="text.secondary">
                {description}
            </Typography>
        </>
    );
});

export default SectionHeading;
