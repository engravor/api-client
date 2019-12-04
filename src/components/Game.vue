<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Boards</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.board-modal>Add Board</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Status</th>
              <th scope="col">Time Elapsed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(board, index) in boards" :key="index">
              <td>{{ board.id }}</td>
              <td>{{ board.status }}</td>
              <td>{{ board.time_elapsed}}
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-danger btn-sm" v-if="board.status == 'paused'" @click=resumeGame(board.id)>Resume</button>
                  <button @click=playGame(board.id) v-if="board.status == 'playing'">Play</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
	<b-modal ref="addBoardModal"
		id="board-modal"
		title="Add a new board"
		hide-footer>
	<b-form @submit="onSubmit" @reset="onReset" class="w-100">
	<b-form-group id="form-title-group"
		label="Rows:"
		label-for="form-rows-input">
	<b-form-input id="form-rows-input"
		type="text"
		v-model="addBoardForm.rows"
		required
		placeholder="Enter rows">
	</b-form-input>
	</b-form-group>
	<b-form-group id="form-columns-group"
		label="Columns:"
		label-for="form-columns-input">
	<b-form-input id="form-columns-input"
	type="text"
	v-model="addBoardForm.columns"
	required
	placeholder="Enter columns">
	</b-form-input>
	</b-form-group>
	<b-form-group id="form-mines-group"
		label="Mines:"
		label-for="form-mines-input">
	<b-form-input id="form-mines-input"
		type="text"
		v-model="addBoardForm.mines"
		required
		placeholder="Enter mines">
	</b-form-input>
	</b-form-group>

	<b-button type="submit" variant="primary">Submit</b-button>
	<b-button type="reset" variant="danger">Reset</b-button>
	</b-form>
	</b-modal>
	</div>
</template>

<script>
import axios from 'axios';
import router from '../router';


export default {
	data() {
		return {
			boards: [],
			addBoardForm: {
				rows: 0,
				columns: 0,
				mines: 0
			}
		};
	},
	methods: {
		resumeGame(id){
			const path = 'https://minesweeper-api-cristian.herokuapp.com/boards/'+id+'/status?action=resume'
			axios.post(path, { headers: { Authorization: localStorage.getItem('usertoken') }})
			.then(() => {
				router.push({ name: 'Play',
					params: { board_id: id }
				})
			})
		},
		playGame(id){
			router.push({ 
				name: 'Play' ,
				params: { board_id: id }
			})
		},
		getBoards() {
			const path = 'https://minesweeper-api-cristian.herokuapp.com/boards';
			axios.get(path, { headers: { Authorization: localStorage.getItem('usertoken') }} )
				.then((res) => {
					this.boards = res.data;
				})
				.catch((error) => {
					// eslint-disable-next-line
					console.error(error);
				});
			},
		addBoard(payload) {
		const path = 'https://minesweeper-api-cristian.herokuapp.com/boards';
		axios.post(path, payload, { headers: { Authorization: localStorage.getItem('usertoken') }})
			.then(() => {
				this.getBoards();
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.log(error);
				this.getBoards();
			});
		},
		initForm() {
			this.addBoardForm.rows = 0;
			this.addBoardForm.columns = 0;
			this.addBoardForm.mines = 0;
		},
		onSubmit(evt) {
			evt.preventDefault();
			this.$refs.addBoardModal.hide();
			const payload = {
				columns: this.addBoardForm.columns,
				rows: this.addBoardForm.rows,
				mines: this.addBoardForm.mines,
			};
			this.addBoard(payload);
			this.initForm();
			},
		onReset(evt) {
			evt.preventDefault();
			this.$refs.addBoardModal.hide();
			this.initForm();
		},
	},
	created() {
		this.getBoards();
	},
};
</script>