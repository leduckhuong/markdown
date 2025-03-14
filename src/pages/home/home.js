import { nextTick } from "vue";

export default {
  data() {
    return {
      blocks: [""], // Danh sách block (mỗi block là một đoạn văn)
      blockRefs: [] // Tham chiếu đến từng block
    };
  },
  methods: {
    insertLineBreak() {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      
      // Tạo các phần tử cần chèn
      const br = document.createElement("br");
      const space = document.createTextNode("\u200B"); // Zero-width space
      
      // Xóa nội dung được chọn (nếu có)
      range.deleteContents();
      
      // Chèn thẻ <br>
      range.insertNode(br);
      
      // Tạo range mới và đặt ngay sau thẻ <br>
      const newRange = document.createRange();
      newRange.setStartAfter(br);
      newRange.setEndAfter(br);
      
      // Chèn ký tự zero-width space
      newRange.insertNode(space);
      
      // Đặt con trỏ sau ký tự zero-width space
      newRange.setStartAfter(space);
      newRange.setEndAfter(space);
      
      // Áp dụng vị trí con trỏ mới
      selection.removeAllRanges();
      selection.addRange(newRange);
      
      // Đảm bảo con trỏ hiển thị bằng cách focus lại vào phần tử
      document.activeElement.focus();
    },
    async handleKeydown(event, index) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (event.shiftKey) {
          
          this.insertLineBreak();
          
        } else {
          // Enter: Tạo block mới
          this.blocks.splice(index + 1, 0, "");  // splice(index, deleteElement, addNewElement)
          await nextTick(); // Chờ Vue cập nhật DOM
          if (this.$refs.blockRefs[index + 1]) {
            this.$refs.blockRefs[index + 1].focus();
          }
        }
      }
      // Xóa block nếu trống và nhấn Backspace
      if (event.key === "Backspace" && (this.blocks[index] === "" || this.blocks[index] === "<br>") && index > 0) {
        event.preventDefault();
        this.blocks.splice(index, 1); // Xóa block
        await nextTick();

        const prevBlock = this.$refs.blockRefs[index - 1];
        if (prevBlock) {
          prevBlock.focus();

          // Đưa con trỏ đến cuối nội dung của block trước đó
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(prevBlock);
          range.collapse(false); // false = đặt con trỏ ở cuối

          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    },
    updateBlock(event, index) {
      this.blocks[index] = event.target.innerHTML;
    }
  }
};

