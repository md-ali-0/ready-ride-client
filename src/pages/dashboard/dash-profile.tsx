import EditProfileDialog from "@/components/handle-edit-profile";
import { IUserData } from "@/Interface/IUserData";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { Edit } from "lucide-react";
import { FC, useState } from "react";

const DashProfile: FC = () => {
    const { data: userData } = useGetMeQuery([{}]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState<IUserData | null>(null);

    const handleEditClick = (user: IUserData) => {
        setUserToUpdate(user);
        setEditDialogOpen(true);
    };

    return (
        <div className="container py-10 mx-auto">
            <div className="border rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
                    <button
                        onClick={() => handleEditClick(userData as IUserData)}
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
            <EditProfileDialog
                user={userToUpdate}
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
            />
        </div>
    );
};

export default DashProfile;
