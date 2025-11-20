import React from "react";
import { Button, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { projects } from "../service/projects";

const Projects = () => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {projects.map((project) => (
        <Card key={project.id} sx={{ width: 350 }}>
          <CardMedia
            component="img"
            height="200"
            image={project.image}
            alt={project.title}
          />
          <CardContent>
            <Typography variant="h6">{project.title}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {project.description}
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                color="primary"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                color="success"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Projects;
