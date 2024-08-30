//右側の編集欄で作成または編集が押された時に呼び出される関数

import CreateTask from "../apis/createTask";
import EditTask from "../apis/editTask";


export default function FormHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id') || 0;
    const isCreate = id == 0; //タスクの編集か新規作成かを判定　0以外の値が入っていたらそれは編集になる。

    if (isCreate){
        CreateTask()
    }else {

        const result = EditTask(id,);

    }




    
}