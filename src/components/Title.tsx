import { Box, Typography } from "@mui/material";

interface TitleProps {
    title: string;
    subTitle: string;
}

const Title: React.FC<TitleProps> = ({title, subTitle}) => {

    return (
        <Box sx={{width: '100%', alignItems: 'start', margin: '0 auto' }}>
            <Typography variant="h3" color="#000">{title}</Typography>
            <Typography variant="h6" color="#636362">{subTitle}</Typography>
        </Box>
    )
}

export default Title;