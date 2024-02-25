import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaGithub } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

import StatsView, { RepoStats } from "../StatsView/StatsView";
import { setRepoStats } from "../../github/getRepoStats";

const Input = () => {
	const [repo, setRepo] = useState<string>("");
	const [currentRepoStats, setCurrentRepoStats] = useState<RepoStats | null>(null);
	const [errorMessageVisible, setErrorMessageVisible] = useState<boolean>(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRepoStats(repo, setCurrentRepoStats, setErrorMessageVisible);
	};

    return (
        <>
            <div className="flex flex-col items-center justifty-center gap-16 lg:gap-24">
				<div className="flex flex-col items-center justify-center gap-6">
                	<div className="flex flex-col items-center justify-center w-full gap-1">
			    		<FaGithub className="size-16 text-slate-200" />
			    		<h1 className="text-slate-200 font-semibold text-[32px]">GitHub repo stats</h1>
			    	</div>

					{errorMessageVisible &&
						<div className="flex px-4 items-center justify-start gap-2 bg-red-500 bg-opacity-25 w-full h-10 rounded-lg shadow-2xl border-[2px] border-red-800">
							<MdErrorOutline className="text-slate-200 text-[20px]" />
							<p className="text-[14px] text-slate-200">Failed to fetch repository information.</p>
						</div>
					}

			    	<form className="w-full flex items-center justify-center gap-2" onSubmit={handleSubmit}>
			    		<input
							type="text"
							spellCheck={false}
							defaultValue={repo}
							onChange={(e) => setRepo(e.target.value)}
							placeholder="Username / Repository"
							className="px-4 py-2 shadow-xl bg-neutral-800 rounded-lg w-[250px] sm:w-[300px] h-[40px] text-slate-200 outline-neutral-700 focus:border-neutral-700"
						/>

			    		<button
							type="submit"
							className="flex items-center justify-center size-[40px] rounded-lg bg-green-600 transition-colors hover:bg-green-500 hover:active:bg-green-400"
						>
			    			<IoIosSearch className="text-slate-200 text-[22px] hover:shadow-2xl" />
			    		</button>
			    	</form>
				</div>

				<StatsView repoStats={currentRepoStats} />
            </div>
        </>
    );
};

export default Input;
