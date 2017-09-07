'use strict';
/**
 * ROUTE: user/:username
 */

const UserController = {
    get: (req, res) => {
        if (req.params.username === "fake_username") {
            res.status(404);
            res.format({
                json: () => {
                    res.json({
                        error: 'User Not Found'
                    });
                }
            });
        } else {
            res.status(200);
            res.format({
                json: () => {
                    res.json({
                        data: "Information about the user"
                    });
                }
            });
        }
    }
};

export default UserController;
