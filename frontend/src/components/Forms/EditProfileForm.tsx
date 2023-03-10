import {
    useState,
    useContext,
    useEffect,
    ChangeEvent,
} from "react";
import styles from "@/styles/EditProfileForm.module.css";
import ProfileCard from "../Cards/ProfileCard";
import LoaderCard from "@/components/Cards/LoaderCard";
import { IProfileCard } from "@/types";
import { AuthContext } from "@/context/auth";
import { ActionsContext } from "@/context/actions";
import { DataContext } from "@/context/data";

export default function EditProfileForm() {
    const { userProfile, } = useContext(AuthContext);
    const { profileHasClaimed, nfts } = useContext(DataContext);
    const { profileTxStatus, edit, } = useContext(ActionsContext);
    const [editProfile, setEditProfile] = useState<IProfileCard>({
        name: "",
        description: "",
        avatar: "",
        followers: [],
        following: [],
        address: "0x000000000000",
        findName: ""
    });

    useEffect(() => {
        if (!userProfile) return;
        setEditProfile({ ...userProfile });
    }, [userProfile]);

    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditProfile({
            ...editProfile,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className={styles.editProfileForm}>
            <div className={styles.editProfileFormSteps}>
                <div className={styles.editProfileFormStep}>
                    <div>
                        <h3>Customize Profile</h3>
                        <p>Let the world know how awesome your are.</p>
                        <br></br><br></br>
                        <div>
                            <div className={styles.editProfileFormLabel}>Name</div>
                            <input
                                name="name"
                                value={editProfile.name}
                                onChange={handleOnInputChange}
                                placeholder="Name.."
                                autoComplete="off"
                                autoCorrect="off"
                            />
                            <br></br><br></br>
                            <div className={styles.editProfileFormLabel}>Avatar URL</div>
                            <input
                                name="avatar"
                                value={editProfile.avatar}
                                onChange={handleOnInputChange}
                                placeholder="Avatar URL.."
                                autoComplete="off"
                                autoCorrect="off"
                            />
                            <br></br><br></br>
                            <div className={styles.editProfileFormLabel}>Bio</div>
                            <input
                                name="description"
                                value={editProfile.description}
                                onChange={handleOnInputChange}
                                placeholder="Bio.."
                                autoComplete="off"
                                autoCorrect="off"
                            />
                            <br></br><br></br>
                            <button
                                className={styles.editProfileBtn}
                                disabled={
                                    !Boolean(userProfile?.name) ||
                                    profileTxStatus.edit.status === "LOADING"
                                }
                                onClick={() => edit(editProfile.name, editProfile.description, editProfile.avatar)}
                            >Update Profile</button>
                        </div>
                    </div>
                    <LoaderCard {...profileTxStatus.edit} />
                </div>
            </div>
            <div className={styles.editProfileFormPreview}>
                <h3>Preview</h3>
                <br></br>
                <ProfileCard
                    isProfile={true}
                    hideFollow={true}
                    profileHasClaimed={profileHasClaimed}
                    {...editProfile}
                    hasFlovatar={Boolean(nfts.length > 0)}
                    name={editProfile.name ? editProfile.name : "Profile name"}
                    description={editProfile.description ? editProfile.description : "Get creative with your bio!"}
                />
            </div>
        </div>
    );
}
