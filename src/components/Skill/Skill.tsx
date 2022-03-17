import { Skill } from '../../models/skill.model';
import './Skill.css';

interface SkillComponentProps {
    skill : Skill 
}

export default function SkillComponent(props : SkillComponentProps){

    const {skill} = props;
    
    return (
        <div className='skills_container'>
            <span className='skills_title'>
                {skill.title}
            </span>
            <span className='skills_votes'>
                {skill.votes}
            </span>
        </div>
    );
}