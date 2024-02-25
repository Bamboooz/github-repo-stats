import axios from "axios";

import { RepoStats } from "../components/StatsView/StatsView";

type Repo = { user: string | null, repo: string | null } | null;

function getRepo(input: string): Repo {
    const simplePattern = /^[^\/]+\/[^\/]+$/;

    if (simplePattern.test(input)) {
        return { user: input.split("/")[0], repo: input.split("/")[1] };
    }
      
    const urlPatterns = [
        /^github\.com\/[^\/]+\/[^\/]+$/,
        /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/,
        /^github\.com\/[^\/]+\/[^\/]+\/$/,
        /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/$/
    ];
  
    for (const pattern of urlPatterns) {
        if (pattern.test(input)) {
            const [, user, repo] = input.match(/github\.com\/([^\/]+)\/([^\/]+)|([^\/]+)\/([^\/]+)/) || [];
            return { user: user || null, repo: repo || null };
        }
    }

    return null;
}

function getApiUrl(user: string, repo: string) {
    return `https://api.github.com/repos/${user}/${repo}`;
}

async function fetchApi(apiUrl: string) {
    try {
        const response = await axios.get(apiUrl);
        const userData = response.data;
        return userData;
    } catch (error) {
        return null;
    }
}

function countDays(commits: any) {
    let foundDays: string[] = [];

    for (let commit of commits) {
        const day = commit["commit"]["author"]["date"];
        const formatDay = day.substring(0, 10); // will work 7976 years until year 10000 but idc.

        if (!foundDays.includes(formatDay)) {
            foundDays.push(formatDay);
        }
    }

    return foundDays.length;
}

async function setRepoStats(input: string, setRepo: React.Dispatch<React.SetStateAction<RepoStats | null>>, setErrorMessageVisible: React.Dispatch<React.SetStateAction<boolean>>) {
    // check if empty
    if (input.replaceAll(" ", "") === "") {
        setRepo(null);
        setErrorMessageVisible(true);
        return;
    }

    const repo = getRepo(input);

    if (!repo) {
        setRepo(null);
        setErrorMessageVisible(true);
        return;
    }

    if (repo) {
        if (!repo.repo || !repo.user) {
            setRepo(null);
            setErrorMessageVisible(true);
            return;
        }
        
        const apiUrl = getApiUrl(repo.user, repo.repo);
        const repository = await fetchApi(apiUrl);
        
        if (!repository) {
            setRepo(null);
            setErrorMessageVisible(true);
            return;
        }

        const commits = await fetchApi(`${apiUrl}/commits`);
        const pulls = await fetchApi(`${apiUrl}/pulls`);

        setRepo({
            name: repository["name"],
            author: repository["owner"]["login"],
            license: repository["license"]["name"],
            stars: repository["stargazers_count"],
            issues: repository["open_issues"],
            prs: pulls.length,
            forks: repository["forks_count"],
            watching: repository["watchers_count"],
            days: countDays(commits),
        });
        setErrorMessageVisible(false);
    }
}

export { setRepoStats };
