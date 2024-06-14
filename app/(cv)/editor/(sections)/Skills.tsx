"use client"
import React, { useEffect, useState } from "react"
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/services/generalService"
import { update } from "cypress/types/lodash"
import { useSession } from "next-auth/react"
import { getProfessionalByEmail } from "@/services/sessionService"
import { MdOutlineModeEdit, MdOutlineDeleteOutline } from "react-icons/md"
import { Prisma } from "@prisma/client"

interface Skill {
  skill_id: string
  title: string
  proficiency: string
}

interface SkillProps {
  skillList: Skill[]
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>
  professionalID: string | null
}

const Skills: React.FC<SkillProps> = ({
  skillList,
  setSkills,
  professionalID,
}) => {
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)

  const toggleEditMode = (cardId: string) => {
    setTimeout(() => {
      if (editingCardId === cardId) {
        setEditingCardId(null)
      } else {
        setEditingCardId(cardId)
      }
    }, 200)
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    skillID: string,
    skill: Skill,
  ) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const skillData: Partial<Skill> = {
      title: formData.get("title") as string,
      proficiency: formData.get("proficiency") as string,
    }

    if (skillData.title.trim() === "" || skillData.proficiency.trim() === "") {
      alert("Title and proficiency must be filled in to save.")
    } else {
      try {
        const updatedSkill = await updateSkill(skillID, skillData)
        console.log("Skill updated successfully:", updatedSkill)
        setSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill.skill_id === skillID ? updatedSkill : skill,
          ),
        )
        toggleEditMode(skill.skill_id)
      } catch (error) {
        console.error("Error updating skill:", error)
      }
    }
  }

  const handleDelete = async (skillID: string, index: number) => {
    try {
      await deleteSkill(skillID)
      console.log("Skill deleted successfully")
      setSkills((prevSkills) => prevSkills.filter((_, idx) => idx !== index))
    } catch (error) {
      console.error("Error deleting skill:", error)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill.skill_id !== skillID),
        )
      }
    }
  }

  const handleCreation = async (ProfessionalID: string) => {
    const skillCreated = await createSkill(ProfessionalID)
    setSkills((prevSkills) => [...prevSkills, skillCreated])
    setEditingCardId(skillCreated.skill_id)
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <h1 className="text-5xl text-gptgreen font-koh_santepheap font-bold mb-1">
        Skills
      </h1>
      <div className="w-full h-0.5 bg-outlinegray rounded-lg mt-3"></div>
      {skillList.map((skill, index) => (
        <div
          onMouseEnter={() => setHoveredCardId(skill.skill_id)}
          onMouseLeave={() => setHoveredCardId(null)}
          key={skill.skill_id}
        >
          {editingCardId === skill.skill_id ? (
            <form
              className={`flex flex-col bg-outlinegray bg-opacity-20 border border-2 border-outlinegray shadow-lg rounded-lg p-4 my-4 mt-6`}
              onSubmit={(event) => handleSubmit(event, skill.skill_id, skill)}
            >
              <div className="flex flex-row w-full">
                {/* skill */}
                <div className="w-full">
                  <p className="text-primarygray font-semibold font-inter text-xs pb-0.5">
                    Skill
                  </p>
                  <label>
                    <input
                      type="text"
                      name="title"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                      defaultValue={skill.title || ""}
                      placeholder="Skill"
                    />
                  </label>
                </div>
                {/* Spacer */} <div className="w-20" />
                {/* Proficiency */}
                <div className="w-44 mr-6">
                  <p className="text-primarygray font-semibold font-inter text-xs pb-0.5">
                    Proficiency
                  </p>
                  <label>
                    <select
                      name="proficiency"
                      className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none w-full"
                      defaultValue={skill.proficiency || ""}
                    >
                      <option value="" disabled>
                        Proficiency:
                      </option>
                      <option value="Basic">Basic</option>
                      <option value="Medium">Medium</option>
                      <option value="Proficient">Proficient</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="flex flex-row w-full mt-3">
                <button
                  className="flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2 px-12 w-auto delay-50 hover:scale-105 duration-200 mr-auto"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="h-auto mr-4 rounded-lg text-xl text-secondarygray hover:text-primarygray"
                  onClick={() => handleDelete(skill.skill_id, index)}
                >
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            </form>
          ) : (
            <div
              className={`flex flex-col border border-2 border-outlinegray hover:border-gptgreen hover:shadow-lg rounded-lg p-4 my-4 mt-6`}
            >
              <div className="flex flex-row">
                <h1 className="text-primarygray w-36">
                  Skill:{" "}
                  <span className="text-secondarygray">{skill.title}</span>{" "}
                </h1>
                <p className="text-primarygray mr-auto">
                  Proficiency:{" "}
                  <span className="text-secondarygray">
                    {skill.proficiency}
                  </span>
                </p>
                {editingCardId === skill.skill_id ||
                hoveredCardId === skill.skill_id ? (
                  <button
                    className="h-auto mr-4 rounded-lg text-xl"
                    onClick={() => toggleEditMode(skill.skill_id)}
                  >
                    <MdOutlineModeEdit />
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="w-full justify-center">
        <button
          onClick={() => handleCreation(professionalID)}
          className="flex flex-row items-center justify-center text-outlinegray hover:text-secondarygray text-md p-2"
        >
          <p className="text-4xl">+</p>
          <p className="m-2 ">Add Skill</p>
        </button>
      </div>
    </div>
  )
}

export default Skills
