import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

// moment
import moment from "moment";

// // ant icons
import { SearchOutlined } from "@ant-design/icons";

// datepicker
import { DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;

const Search = () => {
	// navigate
	const navigate = useNavigate();

	const [date, setDate] = useState("");
	const [people, setPeople] = useState("");
	const [price, setPrice] = useState("");

	const handleSubmit = () => {
		console.log(date, people, price);
		navigate(`/search?date=${date}&people=${people}&price=${price}`);
	};

	return (
		<div className="pb-4">
			<div className="d-flex w-100 justify-content-between">
				<RangePicker
					onChange={(value, dateString) => setDate(dateString)}
					size="large"
					className="w-100 mx-1"
					disabledDate={(current) =>
						current &&
						current.valueOf() < moment().subtract(1, "days")
					}
				/>

				<Select
					onChange={(value) => setPeople(value)}
					size="large"
					className="w-100 mx-1"
					placeholder="People">
					<Select.Option value="1">1</Select.Option>
					<Select.Option value="2">2</Select.Option>
					<Select.Option value="3">3</Select.Option>
					<Select.Option value="4">4</Select.Option>
				</Select>

				<Select
					onChange={(value) => setPrice(value)}
					size="large"
					className="w-100 mx-1"
					placeholder="Price">
					<Select.Option id="1" value="0,10">
						£{" "}
						<span className="text-body-tertiary">
							(less than 10)
						</span>
					</Select.Option>
					<Select.Option id="2" value="11,50">
						££ <span className="text-body-tertiary">(11-50)</span>
					</Select.Option>
					<Select.Option id="3" value="51,100">
						£££ <span className="text-body-tertiary">(51-100)</span>
					</Select.Option>
					<Select.Option id="4" value="101,5000">
						££££{" "}
						<span className="text-body-tertiary">
							(greater than 100)
						</span>
					</Select.Option>
				</Select>

				<SearchOutlined
					type="button"
					onClick={() => {
						handleSubmit();
					}}
					className="btn btn-primary mx-1"
				/>
			</div>
		</div>
	);
};

export default Search;
