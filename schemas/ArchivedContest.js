
import mongoose from "mongoose";


const ParticipantSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        }, // User unique ID

        ign: {
            type: String,
            required: true
        }, // In-Game Name (IGN)

        payment_status: {
            type: String,
            enum: ["pending", "paid", "failed"],
            required: true,
            default: "pending"
        }, // 'pending', 'paid', 'failed'

    }

)


export const archivedContestSchema = new mongoose.Schema(
    {

        contest_Id: {
            type: String,
            required: true
        }, // Unique contest ID (UUID or unique string)

        game_name: {
            type: String,
            enum: ["BGMI", "COD", "FF"],
            required: true
        }, // Game name (BGMI, COD, FF, etc.)

        contest_title: {
            type: String,
            required: true
        }, // Title of the contest

        description: {
            type: String,
            required: true
        }, // Description

        entry_fee: {
            type: Number,
            required: true
        }, // Entry fee

        total_slots: {
            type: Number,
            required: true
        }, // Total slots

        slots_booked: {
            type: Number,
            default: 0
        }, // Booked slots (default 0)

        maps: [
            {
                type: String,
                default: "", // Map name
            }
        ],

        team_mode: {
            type: String,
            enum: ["Solo", "Duo", "Squad"],
            required: true
        }, // Game mode (Solo, Duo, Squad)

        prize_pool: {
            type: Number,
            required: true
        }, // Prize pool amount

        date: {
            type: Number,
            required: true
        }, // ISO Date string

        time: {
            type: Number,
            required: true
        }, // Match time

        status: {
            type: String,
            enum: ["Upcoming", "Ongoing", "Completed"],
            default: 'Upcoming'
        }, // Status (Upcoming, Ongoing, Completed)

        rules: [
            {
                type: String,
                default: "",
            }
        ], // Array of rules

        participants:
        {
            type: [ParticipantSchema],

        }, // Array of participant objects

        contest_image_url: {
            type: String,
            required: true,
            default: ''
        }, // S3 URL

        roomId: {
            type: String,
            required: true,
            default: "abc123",
        },

        roomPassward: {
            type: String,
            required: true,
            default: "abc123",
        },

        winning_criteria: {
            type: String,
            required: true,
        },

        game_specific_data: {
            type:
            {
                team_size: 0,
                match_code: '',
            },
        },
        position_prize: {
            type:
            {
                first: 0,
                second: 0,
                third: 0,
                top4: 0,
                top5: 0,
                top6: 0,
                top7: 0,
                top8: 0,
                top9: 0,
                top10: 0,
                top11_20: 0,
            }
        }
    },

    { timeseries: true }
)




export const ArchivedContest = mongoose.model("ArchivedContest", archivedContestSchema);
