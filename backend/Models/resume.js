const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
    // fileId: { type: mongoose.Schema.Types.ObjectId, required: true },  // GridFS file ID
	personal_information: {
		full_name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String },
		linkedin: { type: String },
		github: { type: String },
		location: {
			city: { type: String },
			state: { type: String },
			country: { type: String }
		}
	},
	education: [{
		degree: { type: String },
		university: { type: String },
		start_year: { type: Number },
		expected_graduation_year: { type: Number },
		GPA: { type: String },
		certifications: [{
			name: { type: String },
			issuer: { type: String },
			year: { type: Number }
		}]
	}],
	technical_skills: {
		programming_languages: [{ type: String }],
		frameworks_and_libraries: [{ type: String }],
		Tools: [{ type: String }],
		operating_systems: [{ type: String }]
	},
	projects: [{
		name: { type: String },
		description: { type: String },
		technologies_used: [{ type: String }],
		link: { type: String }
	}],
	work_experience: [{
		role: { type: String },
		organization: { type: String },
		start_date: { type: String },
		end_date: { type: String },
		responsibilities: [{ type: String }]
	}],
	achievements: [{
		title: { type: String },
		description: { type: String },
		year: { type: Number }
	}],
	publications: [{
		title: { type: String },
		conference: { type: String },
		year: { type: Number },
		link: { type: String }
	}],
	references: [{
		name: { type: String },
		position: { type: String },
		university: { type: String },
		email: { type: String }
	}],
	extracurricular_activities: [{
		role: { type: String },
		organization: { type: String },
		start_date: { type: String },
		end_date: { type: String },
		description: { type: String },
		achievements: [{ type: String }]
	}],
	fileId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ✅ Added GridFS file ID
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // ✅ Store user ID

}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);
