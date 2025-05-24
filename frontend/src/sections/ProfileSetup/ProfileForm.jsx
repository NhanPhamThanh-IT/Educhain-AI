import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

const ProfileForm = ({ userData, handleChange, genders, countries }) => (
    <Grid container spacing={2} sx={{ mt: 3 }}>
        {["fullname", "nickname", "address", "phone"].map((field, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
                <TextField
                    fullWidth
                    label={field.replace(/\b\w/g, (c) => c.toUpperCase())}
                    variant="outlined"
                    value={userData[field] || ""}
                    onChange={handleChange(field)}
                />
            </Grid>
        ))}
        {["gender", "country"].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
                <TextField
                    fullWidth
                    select
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    variant="outlined"
                    value={userData[field] || ""}
                    onChange={handleChange(field)}
                >
                    {(field === "gender" ? genders : countries).map((item) => (
                        <MenuItem key={item.name || item} value={item.name || item}>
                            {field === "country" && (
                                <img
                                    src={`https://flagcdn.com/w40/${item.code}.png`}
                                    alt={item.name}
                                    style={{ width: 24, height: 16, marginRight: 8 }}
                                />
                            )}
                            {item.name || item}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        ))}
    </Grid>
);

export default ProfileForm;
