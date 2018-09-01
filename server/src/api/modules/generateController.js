export default function (model, overrides) {
    var controller = {
        findByParam: function (req, res, next, id) {
            model.findById(id, function (err, doc) {
                if (err) res.status(404).send({ success: false, error: { message: "Not found" } });
                req.docId = doc.id;
                next();
            });
        },
        createOne: function (req, res) {
            var body = req.body;
            body.userId = req.user.id;
            model.create(body, function (err, doc) {
                if (err) res.status(401).send({ success: false, error: { ...err } });
                res.status(200).send({ success: true, data: doc });
            });
        },
        deleteOne: function (req, res) {
            var id = req.docId;
            model.deleteOne({ _id: id }, function (err, doc) {
                if (err) res.status(401).send({ success: false, error: { ...err } });;
                res.status(200).send({ success: true });
            });
        },
        getAll: function (req, res) {
            model.find({}, function (err, docs) {
                if (err) res.status(401).send({ success: false, error: { ...err } });;
                res.status(200).send({ success: true, data: docs });
            });
        },
        getOne: function (req, res) {
            var id = req.docId;
            model.find({ _id: id }, function (err, docs) {
                if (err) res.status(401).send({ success: false, error: { ...err } });;
                res.status(200).send({ success: true, data: docs[0] });
            });
        },
        updateOne: function (req, res) {
            var id = req.docId;
            var body = req.body;
            model.findOneAndUpdate({ _id: id }, body, function (err, doc) {
                if (err) res.status(401).send({ success: false, error: { ...err } });;
                var updated = Object.assign({}, body, doc);
                res.status(200).send({ success: true, data: updated });
            });
        }
    };

    if (!overrides) {
        overrides = {}
    }

    return Object.assign({}, controller, overrides);
};