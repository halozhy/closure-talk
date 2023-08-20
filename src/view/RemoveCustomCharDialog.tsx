import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomDataSource from "../data/CustomDataSource";
import { useAppContext } from "../model/AppContext";
import { DataSources } from "../model/Constants";
import CustomCharacter from "../model/CustomCharacter";

class RemoveCustomCharDialogProps {
  char: CustomCharacter | null = null
  setClose = () => {}
  setOnlyRemove = () => {}
}

export default function RemoveCustomCharDialog(props: RemoveCustomCharDialogProps) {
  const ctx = useAppContext();
  const { t } = useTranslation();

  return (
    <Dialog
    open={props.char !== null}
    onClose={props.setClose}
  >
    <DialogTitle>{t("remove-custom-char-confirm-title")}</DialogTitle>
    <DialogContent>
      <DialogContentText>{t("remove-custom-char-confirm-text")}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.setClose}>{t("remove-custom-char-confirm-cancel")}</Button>
      <Button onClick={props.setOnlyRemove}>仅从下方移除</Button>
      <Button color="warning" onClick={() => {
        const char = props.char!;
        // console.log(char);

        const ds = DataSources[DataSources.length - 1] as CustomDataSource;
        ds.remove_character(char);

        const chars = new Map(ctx.characters);
        chars.delete(char.id);
        ctx.setCharacters(chars);
        // ctx.characters = chars;

        props.setClose();
        props.setOnlyRemove(); // 调用这个，实现头像变换
        // ctx.setActiveChars(ctx.activeChars.filter(c => (c.character.id !== char.id)));

        // 对chat中的此角色进行角色重设
        console.log(ctx.chat);
        let chats = ctx.chat;
        chats.forEach(chat => {
            if (Object.prototype.hasOwnProperty.call(chat, "char")) {
              const value = chat["char"];
              const ch = value?.character;
              if (ch instanceof CustomCharacter && ch.id === char.id) {
                chat.char = null;
              }
          }
        });

        // 在这里需要实现对chat区域的热更新
        ctx.setChat(chats);


        // ctx.setChatToLS(chats)

        // window.location.reload()
        // let c = ctx.activeChars.filter(c => {
        //   console.log(c);
        //   console.log(char);
        //   console.log(c.character.id, char.id);

        //   // c.get_id() !== char.id
        //   return 0;
        // })
        // console.log(c);
        // 判断要不要更改curChar
      // if (currentChar?.get_id() === ch.get_id()) {
      //   // 需要改
      //   console.log('NEED change!');
      //   // ctx.activeChars
      //   for (let index = 0; index < ctx.activeChars.length; index++) {
      //     const char = ctx.activeChars[index];
      //     if (char?.get_id() === ch.get_id()) {
      //       if (index - 1 >= 0) {
      //         setCurrentChar(ctx.activeChars[index - 1]);
      //       }
      //       else {
      //         setCurrentChar(null);
      //       }
      //       break;
      //     }
      //   }
      // }

      }}>{t("remove-custom-char-confirm-yes")}</Button>
    </DialogActions>
  </Dialog>
  )
}
