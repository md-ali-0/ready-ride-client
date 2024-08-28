import EditProfileDialog from "@/components/handle-edit-profile";
import UserSidebar from "@/components/user-sidebar";
import { IUserData } from "@/interface/IUser";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { Edit } from "lucide-react";
import { FC, useState } from "react";

const Profile: FC = () => {
    const { data: userData } = useGetMeQuery([{}]);
    // console.log(userData);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState<IUserData | null>(null);

    const handleEditClick = (user: IUserData) => {
        setUserToUpdate(user);
        setEditDialogOpen(true);
    };

    return (
        <div className="container py-12 mx-auto">
            {/* <div className="bg-primary rounded-3xl py-8 sm:py-14">
                <h3 className="text-center text-xl md:text-5xl text-primary-foreground font-bold">
                    Welcome to Profile, {userData?.name}
                </h3>
            </div> */}
            <div className="flex flex-col md:flex-row sm:px-10 gap-10">
                <UserSidebar name={userData?.name} />

                {/* <!-- Main content --> */}
                <div className="flex-1">
                    <div className="border rounded-lg p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold mb-4">
                                My Profile
                            </h2>
                            <button
                                onClick={() =>
                                    handleEditClick(userData as IUserData)
                                }
                            >
                                <Edit size={20} />
                            </button>
                        </div>
                        <hr className="py-2" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <strong>Registration Date:</strong>
                                <p>
                                    {new Date(
                                        userData?.createdAt as Date
                                    ).toDateString()}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <strong>Name:</strong>
                                <p>{userData?.name}</p>
                            </div>
                            <div className="col-span-2">
                                <strong>Email:</strong>
                                <p>{userData?.email}</p>
                            </div>
                            <div className="col-span-2">
                                <strong>Phone Number:</strong>
                                <p>{userData?.phone}</p>
                            </div>
                            <div className="col-span-2">
                                <strong>Address:</strong>
                                <p>{userData?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditProfileDialog
                user={userToUpdate}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
        </div>
    );
};

export default Profile;
