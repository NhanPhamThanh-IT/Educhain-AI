import React from 'react';
import { Box, Typography, Avatar, AvatarGroup } from '@mui/material';

export function SocialProof() {
    return (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AvatarGroup
                sx={{
                    '& .MuiAvatar-root': { width: 35, height: 35, fontSize: '1rem' },
                }}
            >
                <Avatar src="https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/457791378_1113577110128227_5285053054347682184_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeED615Fu6a8O5QPvyENoFuABFoNO-PQn48EWg0749CfjyZt22JBkeWNNt_a2RAozZmlm8Pkm3D1edIMoiQBRd_U&_nc_ohc=osIdHHak4e0Q7kNvwFpjaUu&_nc_oc=AdnA8asw-FNUCI5abXwkfv7I54lYebcuyUJOg4IVxVIrDgnlG1aJ2nqF1b6yhFRftKQ&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&_nc_gid=b4usOyw-JEjldJiHIgGQTg&oh=00_AfJa8ZZ199dsaqM1GC0MH1V-zDfBrpNmTVgTB6QGFizA_Q&oe=6828B3B8" />
                <Avatar src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/480749832_1085842260013183_6620778893531098027_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeG59VbsGp7B2tQIQ7ckpqpPCqzeNgcCHFsKrN42BwIcW_2ixTQRExN6p9mEUivsOdi2MBJhk6HvKImm454FqKtW&_nc_ohc=T3l4Cl1-SLkQ7kNvwH_qera&_nc_oc=Adlm1gy8liFMWb24D4saXpnrrdh7OGYzd7gbzwsbe7pu1mqhki6a3CbNIsqFde9kZ0k&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=1lml9d6QLAzGwOZ4OM3i7Q&oh=00_AfLGWui-NPGiuTg4D648pK_98SWE7DwWVazxT-vgyKTpPg&oe=68289A1F" />
                <Avatar src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/490649403_3957194347931482_7233391329628094_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH6eHigr0lwfKAj7D4f2OO3skjj8IyiVHOySOPwjKJUc2gpOkLCMwGFDi45bRMTTafOirGTX3nSJDg6ihgQSbIh&_nc_ohc=_8-sXA7B31UQ7kNvwG8e4Kw&_nc_oc=AdnEQAy_xlXoWG1_oEaXH4M_ogynqAqMXy9zaoOloEYuBrLQpuBqF8jam_QqurKXdgM&_nc_zt=23&_nc_ht=scontent.fhan3-4.fna&_nc_gid=LA6M7oRM5cs33zop3D3fjQ&oh=00_AfLCoGUnMDUj8x-YzNC8cNIHj8tO3juonGgz2KntHEfxpA&oe=6828B0A0" />
                <Avatar src="https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-6/486552245_4546527018907184_3562215726974324782_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGYel8-HUgN5EMiAuHW9wA0w-pYarspM9jD6lhquykz2BXY2YfrXP8Hoe8LgLR5RD7IvgwU_WyO0BDmXoR208Ra&_nc_ohc=NtjsQBmRmIQQ7kNvwGG2AWc&_nc_oc=Adk2CStaw_cnde2OI7K7LggvDJbLj4USKbiAvNVMTeNV8PrpShWF99panMEw2a-_2UE&_nc_zt=23&_nc_ht=scontent.fhan4-5.fna&_nc_gid=CumiW-XzeL8bBUPAitL3ew&oh=00_AfK2vENsrEyvrfv36VpxKVJOprQ593QXlf17jj94RrCOtw&oe=6828AEF1" />
                <Avatar src="https://scontent.fhan4-5.fna.fbcdn.net/v/t1.6435-9/78559268_827240581047930_2013302216768618496_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=94e2a3&_nc_eui2=AeFRaPQyJZopjxu8wACl4XkkL8Js16iL0pUvwmzXqIvSlbUd5i-J3HdqQKNKmVU4pLbJBb-d086ookdNBL-Ed_7S&_nc_ohc=Z2lNvrfxzA0Q7kNvwF4Tu-U&_nc_oc=AdncwdTQKBY7RncK7bTyEnJftUYGxB-zXpIArv42czj_lsFxe9HajwuJ4s6J0-z4EwE&_nc_zt=23&_nc_ht=scontent.fhan4-5.fna&_nc_gid=dNhK7BdL2f6cOk8ugXjjcg&oh=00_AfJTdhiLjHMzJEhni5z5ASsXLup01QYFLhHf9qoGnvy9yw&oe=684A2DFD" />
            </AvatarGroup>
            <Typography
                sx={{ ml: 1, userSelect: 'none' }}
                variant="subtitle1"
                color="text.secondary"
            >
                Trusted by a global community of learners
            </Typography>
        </Box>
    );
}
