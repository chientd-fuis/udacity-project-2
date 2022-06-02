import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../../../util/util';
const router: Router = Router();

router.get('/filteredimage', async (req: Request, res: Response) => {
    let image_url = req.query.image_url;
    if(!image_url){
      return res.status(400).send({ message: 'Image url is required' });
    }
    if(!checkURLImage(image_url)){
      return res.status(400).send({ message: 'Image url is invalid' });
    }
    try {
      let item = await filterImageFromURL(image_url);
      setInterval( () => deleteLocalFiles() , 5000)
      return res.sendFile(item);
    } catch(error) {
      return res.status(404).send({error: error, message: 'Can not get image from url' });
    }
});

function checkURLImage(url:string) {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export const ImageRouter: Router = router;