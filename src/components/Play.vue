<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Board - {{board.id}} // {{board.status}} </h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" @click=pause(board.id)>Pause</button>
        <br><br>
        <table class="table table-hover">
          <tbody>
            <tr v-for="(elem, row) in current_state" :key="row">
              <td>
                <div class="btn-group" role="group">
                  <span v-for="(e, column) in elem" :key="column">
					<button @click=markCell(row,column) @click.right=flagCell(row,column)>{{ e }}</button>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
	data() {
		return {
			board: {
			id: 0,
			current_game_state: '',
			status: '',
			mines: 0,
			rows: 0,
			columns: 0
			},
			current_state: ''
		};
	},
	methods: {
		pause: function(board_id){
			const path = 'https://minesweeper-api-cristian.herokuapp.com/boards/'+board_id
			+'/status?action=pause'
			axios.post(path, { headers: { Authorization: localStorage.getItem('usertoken') }})
			.then(() => {
				router.push({ name: 'Game' })
			})
		},
		flagCell: function(row,column){
			var board_id = this.$route.params.board_id
			const path = 'https://minesweeper-api-cristian.herokuapp.com/play/' + board_id;
			var payload = {
				"row" : row,
				"column" : column,
				"operation": 'F'
			};
			axios.post(path, payload, { headers: { Authorization: localStorage.getItem('usertoken') }})
			.then((res) => {
				this.board = res.data
				var current_state = res.data.current_game_state
				current_state = current_state.replace("'state':","")
				current_state = current_state.replace("{", "").replace("}", "")
				current_state = current_state.replace("[[","").replace("]]","").split("], [")
				current_state.forEach(function(part, index) {
					this[index] = part.split(",");
				}, current_state);
				this.current_state = current_state;
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.log(error);
			});
		},
		markCell: function(row, column) {
			var board_id = this.$route.params.board_id
			const path = 'https://minesweeper-api-cristian.herokuapp.com/play/' + board_id;
			var payload = {
				"row" : row,
				"column" : column,
				"operation": 'X'
			};
			axios.post(path, payload, { headers: { Authorization: localStorage.getItem('usertoken') }})
			.then((res) => {
				this.board = res.data
				var current_state = res.data.current_game_state
				current_state = current_state.replace("'state':","")
				current_state = current_state.replace("{", "").replace("}", "")
				current_state = current_state.replace("[[","").replace("]]","").split("], [")
				current_state.forEach(function(part, index) {
					this[index] = part.split(",");
				}, current_state);
				this.current_state = current_state;
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.log(error);
			});
		},
		loadGame: function(){
			var board_id = this.$route.params.board_id
			const path = 'https://minesweeper-api-cristian.herokuapp.com/boards/' + board_id ;
			axios.get(path, { headers: { Authorization: localStorage.getItem('usertoken') }})
			.then((res) => {
				this.board = res.data
				var current_state = res.data.current_game_state
				current_state = current_state.replace("'state':","")
				current_state = current_state.replace("{", "").replace("}", "")
				current_state = current_state.replace("[[","").replace("]]","").split("], [")
				current_state.forEach(function(part, index) {
					this[index] = part.split(",");
				}, current_state);
				this.current_state = current_state;
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.log(error);
			});
		}
	},
	beforeMount(){
		this.loadGame()
	}
}
</script>