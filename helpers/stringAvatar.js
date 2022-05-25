import stringToColor from "./stringToColor";

export default function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children:
      name.split(" ").length === 1
        ? `${name[0]}`
        : `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
