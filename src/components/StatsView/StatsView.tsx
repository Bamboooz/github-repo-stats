import React from "react";
import { FaRegEye, FaRegStar, FaGithub } from "react-icons/fa6";
import { TbLicense } from "react-icons/tb";
import { IoWarningOutline } from "react-icons/io5";
import { GoRepoForked, GoGitPullRequest } from "react-icons/go";
import { LuPackage } from "react-icons/lu";

type RepoStats = {
    name: string;
    author: string;
    license: string;
    stars: number;
    issues: number;
    prs: number;
    forks: number;
    watching: number;
    days: number;
};

interface StatsViewProps {
    repoStats: RepoStats | null;
}

const StatsView: React.FC<StatsViewProps> = ({ repoStats }) => {
    return (
        <>
            {repoStats &&
                <div className="flex mx-4 max-lg:flex-col items-start justify-center gap-6 lg:gap-24">
                    <div className="flex flex-col items-start justify-center gap-4">
                        <div className="flex items-center justify-center gap-2">
                            <FaGithub className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"Repository: " + repoStats.name}</p>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <FaGithub className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"Author: " + repoStats.author}</p>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <TbLicense className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"License: " + repoStats.license}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center gap-4">
                        <div className="flex items-center justify-center gap-2">
                            <FaRegStar className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"Stars: " + repoStats.stars}</p>
                        </div>
                
                        <div className="flex items-center justify-center gap-2">
                            <IoWarningOutline className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"Issues: " + repoStats.issues}</p>
                        </div>
                
                        <div className="flex items-center justify-center gap-2">
                            <GoGitPullRequest className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"Pull Requests: " + repoStats.prs}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center gap-4">
                        <div className="flex items-center justify-center gap-2">
                            <GoRepoForked className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"Forks: " + repoStats.forks}</p>
                        </div>
                
                        <div className="flex items-center justify-center gap-2">
                            <FaRegEye className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"Watching: " + repoStats.watching}</p>
                        </div>
                
                        <div className="flex items-center justify-center gap-2">
                            <LuPackage className="text-slate-400 size-5 sm:size-6" />
                            <p className="text-slate-400 text-5 sm:text-6">{"Days worked on project: " + repoStats.days}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export type { RepoStats };
export default StatsView;
