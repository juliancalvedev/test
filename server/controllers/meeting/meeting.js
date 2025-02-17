const MeetingHistory = require('../../model/schema/meeting')

const add = async (req, res) => {
    try {
        const {
            agenda,
            attendes,
            attendesLead,
            location,
            related,
            dateTime,
            notes,
            createBy,
        } = req.body;

        const meeting = new MeetingHistory({
            agenda,
            attendes,
            attendesLead,
            location,
            related,
            dateTime,
            notes,
            createBy
        });

        await meeting.save();
        res.status(200).json({ message: 'Meeting created successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const index = async (req, res) => {
    try {
        const params = req.params;
        const meetings = await MeetingHistory.find({}).populate('createBy', 'username').lean();
        const formattedMeetings = meetings.map(meeting => ({
            ...meeting,
            createdByName: meeting.createBy ? meeting.createBy.username : "Unknown"
        }));

        res.status(200).json(formattedMeetings);
    } catch (error) {
        res.status(500).json({ error });
    }

}

const view = async (req, res) => {
    try {
        const { id } = req.params;
        const meeting = await MeetingHistory.findById(id).populate('createBy', 'username').lean();
        const formattedMeetings = {
            ...meeting,
            createdByName: meeting.createBy ? meeting.createBy.username : "Unknown"
        };

        res.status(200).json(formattedMeetings);
    } catch (error) {
        res.status(500).json({ error });
    }

}

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        await MeetingHistory.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted successfully' });

    } catch (error) {
        res.status(500).json({ error });
    }

}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body;
        await MeetingHistory.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Deleted many successfully' });

    } catch (error) {
        res.status(500).json({ error });
    }

}

module.exports = { add, index, view, deleteData, deleteMany }