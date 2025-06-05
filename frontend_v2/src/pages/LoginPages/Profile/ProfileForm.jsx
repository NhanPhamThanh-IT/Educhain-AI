import { memo } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

// Text field component for reuse and better performance
const CustomTextField = memo(
  ({
    fullWidth,
    label,
    variant,
    value,
    onChange,
    select = false,
    children,
  }) => (
    <TextField
      fullWidth={fullWidth}
      label={label}
      variant={variant}
      value={value || ""}
      onChange={onChange}
      select={select}
    >
      {children}
    </TextField>
  )
);

// Flag image component for better performance
const FlagImage = memo(({ code, name }) => (
  <img
    src={`https://flagcdn.com/w40/${code}.png`}
    alt={name}
    style={{ width: 24, height: 16, marginRight: 8 }}
    loading="lazy" // Add lazy loading for better performance
  />
));

const ProfileForm = memo(({ userData, handleChange, genders, countries }) => (
  <Grid container spacing={2} sx={{ mt: 3 }}>
    {/* Regular text fields */}
    {["fullname", "nickname", "address", "phone"].map((field, idx) => (
      <Grid item xs={12} sm={6} key={field}>
        <CustomTextField
          fullWidth
          label={field.replace(/\b\w/g, (c) => c.toUpperCase())}
          variant="outlined"
          value={userData[field] || ""}
          onChange={handleChange(field)}
        />
      </Grid>
    ))}

    {/* Select fields */}
    {["gender", "country"].map((field) => (
      <Grid item xs={12} sm={6} key={field}>
        <CustomTextField
          fullWidth
          select
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          variant="outlined"
          value={userData[field] || ""}
          onChange={handleChange(field)}
        >
          {(field === "gender" ? genders : countries).map((item) => (
            <MenuItem key={item.name || item} value={item.name || item}>
              {field === "country" && item.code && (
                <FlagImage code={item.code} name={item.name} />
              )}
              {item.name || item}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
    ))}
  </Grid>
));

// Add display name for debugging purposes
ProfileForm.displayName = "ProfileForm";
CustomTextField.displayName = "CustomTextField";
FlagImage.displayName = "FlagImage";

export default ProfileForm;
