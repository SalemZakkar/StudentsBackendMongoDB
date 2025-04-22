import * as routerExp from "express";
import * as controller from "../controller/student_controller";

const router = routerExp.Router();

router.route('/').post(controller.save).get(controller.get);

router.route('/:id').put(controller.update).delete(controller.remove)

export default router;