import ProjectsClient from './ProjectsClient';

async function getProjects() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
  const fetchUrl = (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') ? '/api-proxy' : apiUrl;
  try {
    const response = await fetch(`${fetchUrl}/projects`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching projects on server:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient initialProjects={projects} />;
}
