import React from "react";
import Select from "react-select";
import { PROBLEM_TAGS } from "../../data/problemTags";

import "./Problemset.css";

export const ProblemNameFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="problem-name-filter">
      Problem name
      <input
        placeholder="Enter Problem name"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export const DifficultyFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  const PROBLEM_DIFFICULTIES = [
    { value: "All", label: "All" },
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  const handleChange = (diff) => {
    if (diff.value === "All") {
      setFilter("");
    } else {
      setFilter(diff.value);
    }
  };
  return (
    <div className="difficulty-filter">
      Difficulty
      <Select
        placeholder="Select Difficulty"
        value={{ value: filterValue || "All", label: filterValue || "All" }}
        isSearchable={false}
        options={PROBLEM_DIFFICULTIES}
        name="difficulty"
        onChange={handleChange}
      />
    </div>
  );
};

export const TagsFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const handleChange = (tags) => {
    setFilter([...tags]);
  };
  return (
    <div className="tags-filter">
      Tags
      <Select
        placeholder="Filter tags"
        value={filterValue || []}
        options={PROBLEM_TAGS}
        isMulti={true}
        isClearable={true}
        name="tags"
        onChange={handleChange}
      />
    </div>
  );
};

export const filterProblemsUsingTag = (problems, columnIds, filterValue) => {
  const filteredProblems = [];
  const filterTags = filterValue || [];
  problems.forEach((problem) => {
    const problemTags = problem.original.published.config.tags;
    let doesAlltagExist = true;

    for (const filterTag of filterTags) {
      // Check if given "selectedTag" exist in the problem or not.
      let doesTagExist = false;
      for (const problemTag of problemTags) {
        if (filterTag.value === problemTag.value) {
          doesTagExist = true;
          break;
        }
      }
      // Given tag does not exist in the problem, it means problem should not be displayed in the table.
      if (doesTagExist === false) {
        doesAlltagExist = false;
        break;
      }
    }

    if (doesAlltagExist) {
      filteredProblems.push(problem);
    }
  });
  return filteredProblems;
};
