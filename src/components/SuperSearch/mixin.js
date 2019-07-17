export default {
  methods: {
    // get some target of an object
    getPath(obj, str) {
      if (typeof obj !== "object") {
        console.warning("typeof obj is not object");
        return obj;
      }
      let arr = str.split("."),
        curr = obj,
        i,
        len = arr.length;
      for (i = 0; i < len; i++) {
        if (!arr[i]) continue;
        curr = curr[arr[i]];
        if (typeof curr !== "object") break;
      }
      return curr;
    }
  }
};
