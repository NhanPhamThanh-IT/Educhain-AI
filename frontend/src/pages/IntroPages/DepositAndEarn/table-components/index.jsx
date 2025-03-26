import React from "react";
import { Card, CardContent, List, ListItem, ListItemText, Container } from "@mui/material";

const PricingList = ({ values }) => {
    return (
        <Container maxWidth="md">
            <Card mb={0} sx={{ boxShadow: 4, borderRadius: 3, overflow: "hidden", bgcolor: "white" }}>
                <CardContent>
                    <List sx={{ backgroundColor: "white", borderRadius: 3, px: 2 }}>
                        {values.map((row, index) => (
                            <ListItem
                                key={row.activity}
                                sx={{
                                    bgcolor: "inherit",
                                    transition: "background-color 0.3s",
                                    borderRadius: 2,
                                    mb: 1,
                                    p: 2,
                                }}
                            >
                                <ListItemText
                                    sx={{ display: "flex", justifyContent: "space-between" }}
                                    primary={row.activity}
                                    secondary={row.price}
                                    primaryTypographyProps={{ fontWeight: 500, color: "#222", display: "inline" }}
                                    secondaryTypographyProps={{ fontWeight: "bold", color: "#555", display: "inline", marginLeft: 1 }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PricingList;
