import { createSupabaseClient } from "../client";

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

export const getUserImageProfile = async (target) => {
  const storage = getStorage();
  const { data, error } = await storage
    .from("vaulto")
    .getPublicUrl(`user/${target}`);
  return { data, error };
};

export const updateUserImageProfile = async ({ path, file, isOldImage }) => {
  const storage = getStorage();

  if (isOldImage) {
    await deleteUserImageProfile(isOldImage);
  }

  const { data, error } = await storage.from("vaulto").upload(path, file);
  return { data, error };
};

export const deleteUserImageProfile = async (oldImage) => {
  // const bucketPath = imageURL.split("/storage/v1/object/public/")[1];
  // const firstSlashIndex = bucketPath.indexOf("/");

  // const bucket = bucketPath.slice(0, firstSlashIndex);
  // const path = bucketPath.slice(firstSlashIndex + 1);

  const storage = getStorage();
  const { data, error } = await storage
    .from("vaulto")
    .remove(`user/${oldImage}`);
  return { data, error };
};
