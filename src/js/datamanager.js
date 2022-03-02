import axios from 'axios';
import { openNotification } from './toast';

class DataManager {
  constructor() {
    console.log("[DM] Loading...");

    // List of procs to currently graph
    this.active_procs = [];

    // List of all procs. Cuts down on API calls.
    this.all_procs = [];

    // Table state, used for refreshing the table
    this.tablestate = null;
    // Chart state, used for refreshing the chart
    this.chartstate = null;

    // API root
    this.apiroot = "https://api.paradisestation.org/profiler/";

    // For debugging
    window.dm = this;

    console.log("[DM] Loaded");
  }

  addProc(rid, ppath) {
    let proc_exists = false;
    this.all_procs.map(value => {
      if ((value.rid === rid) && (value.ppath === ppath)) {
        proc_exists = true;
      }
    });

    if (proc_exists) {
      let escape = false;
      this.active_procs.map(value => {
        if ((value.rid === rid) && (value.ppath === ppath)) {
          openNotification("Error", "That proc from that round is already in the list!");
          escape = true;
          return; // We already have this
        }
      });

      // Have to double wrap it
      if (escape) {
        return;
      }

      // Re add it if we are here
      this.all_procs.map(value => {
        if ((value.rid === rid) && (value.ppath === ppath)) {
          this.active_procs.push(value);
          this.refreshAll();
          escape = true;
          return; // We already have this
        }
      });

      // Have to double wrap it
      if (escape) {
        return;
      }
    }

    // Have to wrap it this way so the data manager can be reached inside the anon function
    const getProcInfo = function (dm) {
      axios.get(dm.apiroot + "getproc?procname=" + encodeURIComponent(ppath) + "&roundid=" + rid.toString()).then(response => {
        let procdata = {};
        procdata["ppath"] = ppath;
        procdata["rid"] = rid;
        procdata["samples"] = [];
        let c = 0;
        response.data.map(entry => {
          let sample = {};
          c++;
          sample["id"] = c;
          sample["series"] = "R" + rid + " - " + ppath;
          sample["self"] = entry.self;
          sample["total"] = entry.total;
          sample["real"] = entry.real;
          sample["over"] = entry.over;
          sample["calls"] = entry.calls;
          sample["time"] = entry.sampleTime;
          procdata["samples"].push(sample);
        });

        dm.all_procs.push(procdata);
        dm.active_procs.push(procdata);
        dm.refreshAll();
      }).catch(error => {
        console.error(error);
        if (error.response.status === 404) {
          openNotification("Error", "No samples found for that proc in that round.");
          return;
        }
      });
    };

    getProcInfo(this);
  }


  // Remove a proc from the active list
  removeProc(procpath) {
    // First split this out
    let ppsplit = procpath.split(":", 2);
    let rid = parseInt(ppsplit[0], 10);
    let ppath = ppsplit[1];

    // Filter active procs
    this.active_procs = this.active_procs.filter(value => {
      return !((value.rid === rid) && (value.ppath === ppath));
    });

    // Refresh the table
    this.refreshAll();
  }

  // Sets the state object for the proc table so it can be refreshed
  setTableState(tablestate) {
    this.tablestate = tablestate;
  }

  // Sets the state object for the chart so it can be refreshed
  setChartState(chartstate) {
    this.chartstate = chartstate;
  }

  // Refresh the table list
  refreshAll() {
    this.tablestate({});
    this.chartstate({});
  }


  // Gets the data for showing in the proc table
  getTableData() {
    let tablelist = [];
    let c = 0;
    this.active_procs.map(ap => {
      c++; // hehe xd
      let localdict = {};
      localdict["key"] = c;
      localdict["rid"] = ap.rid;
      localdict["procpath"] = ap.ppath;
      localdict["removal"] = ap.rid + ":" + ap.ppath;
      tablelist.push(localdict);
    });

    return tablelist;
  }

  // Gets the data for showing on the chart
  getChartData(filtertype) {
    let chartdata = [];
    this.active_procs.forEach(ap => {
      ap.samples.forEach(s => {
        let sampledata = {};
        sampledata["sampleid"] = s.id;
        sampledata["series"] = s.series;
        sampledata["data"] = s[filtertype];
        sampledata["ppath"] = ap.ppath;
        chartdata.push(sampledata);
      });
    });

    return chartdata;
  }

  // Gets search suggestions
  async getSearchSuggestions(intext) {
    if (intext.length < 12) {
      // API only responds if >=12 characters, dont bother querying it
      return null;
    }

    let response = await axios.get(this.apiroot + "procsearch?searchterm=" + encodeURIComponent(intext));

    let suggestions = [];

    if ("data" in response) {
      response.data.forEach(element => {
        suggestions.push({ label: element, value: element });
      });
    } else {
      response.push({});
    }

    return suggestions;
  }
}


export const DM = new DataManager();
