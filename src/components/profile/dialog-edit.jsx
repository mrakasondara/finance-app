import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

export const DialogEdit = ({ props }) => {
  const {
    userData,
    setUserData,
    isLoading,
    updateShortProfile,
    open,
    setOpen,
    setImagePath,
  } = props;

  const [image, setImage] = useState("");

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage("/profile/placeholder.png");
      return;
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setImagePath(e.target.files);
  };

  useEffect(() => {
    setImage(image);
  }, [image]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="absolute right-3 bg-main text-white cursor-pointer"
          size="sm"
        >
          <Edit />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <form onSubmit={updateShortProfile}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Change your short profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="flex flex-col items-center gap-3">
              <Avatar className={"w-30 h-auto"}>
                <AvatarImage
                  src={image ? image : userData.image_thumb}
                  alt="profile"
                />
              </Avatar>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => onSelectFile(e)}
              />
            </div>
            <div className="flex gap-3">
              <div className="grid w-1/2 gap-3">
                <label htmlFor="first-name">First Name</label>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, first_name: e.target.value })
                  }
                  value={userData.first_name}
                  id="first-name"
                  name="first-name"
                />
              </div>
              <div className="grid w-1/2 gap-3">
                <label htmlFor="last-name">Last Name</label>
                <Input
                  onChange={(e) =>
                    setUserData({ ...userData, last_name: e.target.value })
                  }
                  value={userData.last_name}
                  id="last-name"
                  name="last-name"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <label htmlFor="bio">Your bio</label>
              <Input
                onChange={(e) =>
                  setUserData({ ...userData, bio: e.target.value })
                }
                value={userData.bio}
                id="bio"
                name="bio"
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="adress">Your adress</label>
              <Input
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                value={userData.address}
                id="adress"
                name="adress"
              />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? <Spinner /> : ""}
              Update Profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
